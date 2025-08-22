import React, { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const LoadingButton = forwardRef(
  ({ className = "", children, isLoading = false, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`relative ${className}`}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
        <span className={`transition-opacity ${isLoading ? "opacity-0" : "opacity-100"}`}>
          {children}
        </span>
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";
