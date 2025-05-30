import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Maintenance() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <Card className="w-full max-w-md text-center shadow-md">
        <CardHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="w-10 h-10 text-yellow-500" />
          <CardTitle className="text-xl">Under Maintenance</CardTitle>
          <CardDescription>
            This page is currently being updated. Please check back later.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex justify-center">
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </CardContent>
      </Card>
    </div>
  );
}
