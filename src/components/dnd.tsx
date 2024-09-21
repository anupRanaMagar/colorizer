"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ImageIcon,
  UploadIcon,
  DownloadIcon,
  RefreshCwIcon,
} from "lucide-react";

export default function ImageColorizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://colorizerapi.onrender.com/colorize",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const reader = response.body?.getReader();
        const contentLength = +(response.headers.get("Content-Length") ?? "0");
        let receivedLength = 0;
        const chunks = [];

        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;

          chunks.push(value);
          receivedLength += value.length;
          setProgress(Math.round((receivedLength / contentLength) * 100));
        }

        const blob = new Blob(chunks);
        const imageUrl = URL.createObjectURL(blob);
        setResultImageUrl(imageUrl);
      } else {
        console.error("Failed to upload the file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (resultImageUrl) {
      const link = document.createElement("a");
      link.href = resultImageUrl;
      link.download = "colorized_image.png";
      link.click();
    }
  };

  const resetState = () => {
    setFile(null);
    setPreviewUrl(null);
    setResultImageUrl(null);
    setLoading(false);
    setProgress(0);
  };

  return (
    <div className="flex items-center justify-center h-screen  p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Image Colorizer
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!resultImageUrl ? (
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center h-64 w-96 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ease-in-out
                ${
                  isDragActive
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 hover:border-primary hover:bg-primary/5"
                }`}
            >
              <input {...getInputProps()} />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {isDragActive
                      ? "Drop the image here"
                      : "Drag & drop an image, or click to select"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Colorized Result:</h2>
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src={resultImageUrl}
                alt="Colorized Result"
                className="w-full h-64 object-contain rounded-lg border border-gray-200"
              />
            </div>
          )}
          {loading && (
            <div className="mt-4 space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-gray-500">
                Processing image... {progress}%
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          {file && !resultImageUrl && !loading && (
            <Button onClick={handleUpload}>
              <UploadIcon className="mr-2 h-4 w-4" /> Colorize Image
            </Button>
          )}
          {resultImageUrl && (
            <>
              <Button onClick={handleDownload} variant="outline">
                <DownloadIcon className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button onClick={resetState}>
                <RefreshCwIcon className="mr-2 h-4 w-4" /> Colorize Another
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
