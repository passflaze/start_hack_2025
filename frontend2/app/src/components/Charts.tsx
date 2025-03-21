import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { PieChartComponent } from "../../../../frontend2/app/src/components/charts/PieChart";
import { UserHeader } from "./common/UserHeader";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { FinalResult, GptService } from "@/client";
import React from "react";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart";

let demoUser = {
  name: "Jack Major",
  age: 22,
  netWorth: "$1,000,000",
};

// Sample data for charts
const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
];

interface DeepgramTranscriptAlternative {
  transcript: string;
  confidence: number;
}

interface DeepgramChannel {
  alternatives: DeepgramTranscriptAlternative[];
}

interface DeepgramResponse {
  channel: DeepgramChannel;
  is_final: boolean;
}

function Charts() {
  const defaultFinalResult: FinalResult = {
    assets: [
      { label: "iShares Core S&P 500", weight: 0 },
      { label: "iShares Core MSCI World", weight: 0 },
      { label: "iShares Core MSCI Emerging Markets IMI", weight: 0 },
      { label: "iShares Nasdaq 100", weight: 0 },
      { label: "iShares MSCI ACWI", weight: 0 },
      { label: "Vanguard FTSE All-World", weight: 0 },
      { label: "iShares Core DAX", weight: 0 },
      { label: "Lyxor Core STOXX Europe 600 (DR)", weight: 0 },
      { label: "iShares Core MSCI Europe", weight: 0 },
      { label: "Xtrackers MSCI USA", weight: 0 },
      { label: "Xtrackers MSCI Emerging Markets", weight: 0 },
      { label: "iShares Core EURO STOXX 50", weight: 0 },
      { label: "Real Estate Sector", weight: 0 },
      { label: "ETF Bond USA 7", weight: 0 },
      { label: "ETF Bond USA 10", weight: 0 },
      { label: "ETF Bond USA 15", weight: 0 },
      { label: "ETF Bond USA 20", weight: 0 },
      { label: "ETF Bond USA 30", weight: 0 },
      { label: "ETF Inflation Adjusted USA 7", weight: 0 },
      { label: "ETF Inflation Adjusted USA 15", weight: 0 },
      { label: "Bitcoin", weight: 0 },
      { label: "Gold", weight: 0 },
      { label: "Silver", weight: 0 },
      { label: "Crude Oil", weight: 0 },
    ],
    stats1: [
      { "Sortino Ratio": 0 },
      { "Calmar Ratio": 0 },

      { "treynor ratio": 0 },
      { "omega ratio": 0 },
      { "inf ratio": 0 },

      { "Total Return": 0 },
      { "95% Value at Risk (VaR)": 0 },
    ],
    stats2: [{ Alpha: 0 }, { Beta: 0 }, { "Maximum Drawdown": 0 }],
    time_serie: [{ date: 0, value: 0 }],
    risk_profile: "",
    goal: "",
  };

  const [results, setResults] = useState<FinalResult>(defaultFinalResult);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");
  const [transcript, setTranscript] = useState<string>("");

  let mediaRecorder: MediaRecorder | undefined;
  let socket: WebSocket | undefined;

  const initializeTranscription = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorder = new MediaRecorder(stream);

      socket = new WebSocket("wss://api.deepgram.com/v1/listen", [
        "token",
        "cf7588e948486a9a5fabfcc45e8baff9a9c2ff8c",
      ]);

      // WebSocket event handlers
      socket.onopen = (): void => {
        console.log({ event: "onopen" });
        setConnectionStatus("Connected");

        if (mediaRecorder) {
          mediaRecorder.addEventListener(
            "dataavailable",
            (event: BlobEvent) => {
              if (
                event.data.size > 0 &&
                socket &&
                socket.readyState === WebSocket.OPEN
              ) {
                socket.send(event.data);
              }
            }
          );

          mediaRecorder.start(250);
        }
      };

      socket.onmessage = (message: MessageEvent): void => {
        console.log({ event: "onmessage", message });
        const received: DeepgramResponse = JSON.parse(message.data);
        const receivedTranscript = received.channel.alternatives[0].transcript;

        if (receivedTranscript && received.is_final) {
          setTranscript(
            (prevTranscript) => prevTranscript + receivedTranscript + " "
          );
        }
      };

      socket.onclose = (): void => {
        console.log({ event: "onclose" });
        setConnectionStatus("Disconnected");
      };

      socket.onerror = (error: Event): void => {
        console.log({ event: "onerror", error });
        setConnectionStatus("Error connecting");
      };
    } catch (error) {
      console.error("Error initializing transcription:", error);
      setConnectionStatus(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    const sendGPT = async () => {
      const res = await GptService.sendGpt({ text: transcript });
      setResults(res);
      console.log(res);
    };

    sendGPT();
  }, [transcript]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const COLORS = [
    // 12 red shades (from light to dark)
    "#FFCDD2",
    "#EF9A9A",
    "#E57373",
    "#EF5350",
    "#F44336",
    "#E53935",
    "#D32F2F",
    "#C62828",
    "#B71C1C",
    "#8B0000",
    "#A50303",
    "#5C0101",

    // 1 light green
    "#81C784",

    // 7 light blue shades
    "#BBDEFB",
    "#90CAF9",
    "#64B5F6",
    "#42A5F5",
    "#2196F3",
    "#1E88E5",
    "#1976D2",

    // 1 gray
    "#9E9E9E",

    // 3 yellow shades
    "#FFF59D",
    "#FFEE58",
    "#FFEB3B",
  ];

  return (
    <Container maxW="full">
      <Box height="100vh" display="flex" flexDirection="column">
        
        {/* Chart Grid */}
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 2 }}
          flex={1}
          templateColumns="repeat(2, 1fr)"
          gap={2}
          p={4}
        >
          {/* Pie Chart */}
          <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4} color="gray.600">
              Asset Allocation
            </Heading>
            {results && (
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  
                  <Pie
                    data={results.assets}
                    dataKey="weight"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={180}
                  >
                    {results.assets.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              ></tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
                
              </ChartContainer>
            )}
          </GridItem>

          {/* Area Chart */}
          <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4} color="gray.600">
              Portfolio Backtest
            </Heading>
            {results && (
              <ChartContainer config={chartConfig}>
                <AreaChart data={results.time_serie}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    fill="#ECC94B"
                    stroke="#D69E2E"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </GridItem>

          {/* Line Chart */}
          <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md" h={"70%"}>
            <Heading size="md" mb={4} color="gray.600">
              Financial Indexes
            </Heading>
            <Table>
              <Thead>
                <Th borderRight="1px solid" borderColor="gray.200">
                  Index
                </Th>
                <Th>Ratio</Th>
              </Thead>
              <Tbody>
                {results.stats1.map((stat, index) => {
                  const [key] = Object.keys(stat);
                  const value = stat[key];

                  return (
                    <Tr key={index}>
                      <Th borderRight="1px solid" borderColor="gray.200">
                        {key}
                      </Th>
                      <Td>{value.toFixed(2)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </GridItem>

          {/* Bar Chart */}
          <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md" h={"70%"}>
            <Heading size="md" mb={4} color="gray.600">
              Portfolio Metric
            </Heading>
            <Table>
              <Thead>
                <Th borderRight="1px solid" borderColor="gray.200">
                  Metric
                </Th>
                <Th>Value</Th>
              </Thead>
              <Tbody>
                {results.stats2.map((stat, index) => {
                  const [key] = Object.keys(stat);
                  const value = stat[key];

                  return (
                    <Tr key={index}>
                      <Th borderRight="1px solid" borderColor="gray.200">
                        {key}
                      </Th>
                      <Td>{value.toFixed(2)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Container>
  );
}

export default Charts;
