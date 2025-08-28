import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { AIInsightCard } from "./AIInsightCard";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { CohereClient } from "cohere-ai";
import {
  DollarSign,
  Heart,
  AlertTriangle,
  ShoppingCart,
  Target,
  TrendingUp,
  Calendar,
  FileText,
  Bot,
} from "lucide-react";

// ✅ Initialize Cohere Client
const cohere = new CohereClient({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [advisorInput, setAdvisorInput] = useState("");
  const [advisorResponse, setAdvisorResponse] = useState("");
  const [loadingAdvisor, setLoadingAdvisor] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docInsights, setDocInsights] = useState("");
  const [loadingDoc, setLoadingDoc] = useState(false);

  const insights = [
    {
      title: "Revenue Forecast",
      value: "$47,250",
      change: 12.5,
      icon: DollarSign,
      color: "green" as const,
    },
    {
      title: "Customer Sentiment",
      value: "4.8/5.0",
      change: 8.2,
      icon: Heart,
      color: "blue" as const,
    },
    {
      title: "Inventory Alert",
      value: "3 Items",
      change: -5.1,
      icon: AlertTriangle,
      color: "yellow" as const,
    },
  ];

  const quickActions = [
    { title: "Add Product", icon: ShoppingCart, href: "/products/add" },
    { title: "Create Campaign", icon: Target, href: "/campaigns/create" },
    { title: "View Analytics", icon: TrendingUp, href: "/analytics" },
    { title: "Schedule Meeting", icon: Calendar, href: "/meetings" },
  ];

  // ✅ Business Advisor using Cohere AI
  const handleAdvisor = async () => {
    if (!advisorInput.trim()) return;
    setLoadingAdvisor(true);
    setAdvisorResponse("");

    try {
      const response = await cohere.generate({
        model: "command-r-plus",
        prompt: `You are an experienced business consultant. Give actionable, practical, and concise advice for this query:\n\n"${advisorInput}"\n\nAdvice:`,
        maxTokens: 200,
        temperature: 0.7,
      });

      setAdvisorResponse(response.generations[0].text.trim());
    } catch (error) {
      console.error("Cohere API Error:", error);
      setAdvisorResponse("⚠️ Could not generate advice. Please try again.");
    }

    setLoadingAdvisor(false);
  };

  // ✅ Document Insights using Cohere AI
  const handleDocument = async () => {
    if (!selectedFile) return;
    setLoadingDoc(true);
    setDocInsights("");

    try {
      const text = await selectedFile.text();

      const response = await cohere.summarize({
        model: "summarize-xlarge",
        text: text.slice(0, 1000), // Prevents token limit issues
        length: "medium",
        extractiveness: "medium",
      });

      setDocInsights(response.summary ?? "");
    } catch (error) {
      console.error("Cohere Summarization Error:", error);
      setDocInsights("⚠️ Could not extract insights. Try again.");
    }

    setLoadingDoc(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with {user?.businessName || "your business"} today
          </p>
        </div>
        <Button variant="primary">View Full Report</Button>
      </motion.div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AIInsightCard {...insight} />
          </motion.div>
        ))}
      </div>

      {/* Business Advisor + Document Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Advisor */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" /> Business Advisor
          </h2>
          <textarea
            value={advisorInput}
            onChange={(e) => setAdvisorInput(e.target.value)}
            placeholder="Ask me anything about your business..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
          <Button
            onClick={handleAdvisor}
            variant="primary"
            className="mt-3"
            disabled={loadingAdvisor}
          >
            {loadingAdvisor ? "Thinking..." : "Get Advice"}
          </Button>
          {advisorResponse && (
            <p className="mt-4 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              {advisorResponse}
            </p>
          )}
        </Card>

        {/* Document Insights */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Document Insights
          </h2>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full mb-3"
          />
          <Button
            onClick={handleDocument}
            variant="primary"
            disabled={!selectedFile || loadingDoc}
          >
            {loadingDoc ? "Analyzing..." : "Extract Insights"}
          </Button>
          {docInsights && (
            <p className="mt-4 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              {docInsights}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};
