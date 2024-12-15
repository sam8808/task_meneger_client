import React from "react";

const Card = ({ className = "", ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`}
      {...props}
    />
  );
};

const CardHeader = ({ className = "", ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  );
};

const CardTitle = ({ className = "", ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
};

const CardDescription = ({ className = "", ...props }) => {
  return (
    <p
      className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
      {...props}
    />
  );
};

const CardContent = ({ className = "", ...props }) => {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
};

const CardFooter = ({ className = "", ...props }) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};