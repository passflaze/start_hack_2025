import {
  Box,
  Button,
  Card,
  Flex,

  GridItem,
  Heading,

  SimpleGrid,

  Table,

  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,

  useDisclosure,
  useColorModeValue,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa6";
import { format } from "date-fns";
import { FiLogOut, FiMenu } from 'react-icons/fi'



import {
  Area,
  AreaChart,

  CartesianGrid,
  Cell,
  Text,
  Label,

  Pie,
  PieChart,

  XAxis,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import { FinalResult, GptService } from "@/client";
;
import { ChartConfig, ChartContainer,  ChartTooltip, ChartTooltipContent } from "./ui/chart";
import SidebarItems from "./common/SidebarItems";





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

    ],
    stats2: [{ Alpha: 0 }, { Beta: 0 }, { "Maximum Drawdown": 0 }],
    time_serie: [{ date: 0, value: 0 }],
    risk_profile: "",
    goal: "",
    info: ""
  };

  const [results, setResults] = useState<FinalResult>(defaultFinalResult);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");
  const [transcript, setTranscript] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
const socketRef = useRef<WebSocket | null>(null);

const initializeTranscription = async (): Promise<void> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    socketRef.current = new WebSocket("wss://api.deepgram.com/v1/listen", [
      "token",
      "cf7588e948486a9a5fabfcc45e8baff9a9c2ff8c",
    ]);

    const mediaRecorder = mediaRecorderRef.current;
    const socket = socketRef.current;

    socket.onopen = (): void => {
      console.log({ event: "onopen" });
      setConnectionStatus("Connected");

      if (mediaRecorder) {
        mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => {
          if (event.data.size > 0 && socket && socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        });

        mediaRecorder.start(250);
      }
    };

    socket.onmessage = (message: MessageEvent): void => {
      console.log({ event: "onmessage", message });
      const received: DeepgramResponse = JSON.parse(message.data);
      const receivedTranscript = received.channel.alternatives[0].transcript;

      if (receivedTranscript && received.is_final) {
        setTranscript((prevTranscript) => prevTranscript + receivedTranscript + " ");
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
    setConnectionStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
};

const stopTranscription = () => {
  if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop()); // Stop the audio stream
  }

  if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
    socketRef.current.close();
  }

  setColor("black");
};

const start = () => {
  if (color === "black") {
    initializeTranscription();
    setColor("red");
  } else {
    stopTranscription();
  }
};

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

  const [color, setColor] = useState<string>("black")

  const bgColor = useColorModeValue('ui.white', 'ui.dark');
  const textColor = useColorModeValue('ui.dark', 'ui.white');
  const secBgColor = useColorModeValue('ui.secondary', 'ui.darkSlate');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex maxW="full" >
      <Flex minW="12%" >
      <IconButton
        
        display={{ base: 'flex', md: 'none' }}
        aria-label="Open Menu"
        position="fixed"
        fontSize="20px"
        m={4}
        zIndex={10}
        icon={<FiMenu />}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="220px">
          <DrawerCloseButton />
          <DrawerBody py={6}>
            <Flex flexDir="column" justify="space-between" h="full">
              <Box>
                <SidebarItems />
                <Flex
                  as="button"
                  p={2}
                  color="ui.danger"
                  fontWeight="bold"
                  alignItems="center"
                >
                  <FiLogOut />
                  <Text ml={2}>Log out</Text>
                </Flex>
              </Box>
                <Text color={textColor} noOfLines={2} fontSize="xs" p={2}>
                  Logged in as: Walter Wannacio
                </Text>
              
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop */}
      <Box
        bg={bgColor}
        h="100vh"
        position="fixed"
        top="100"
        left="0"
        w={{ md: "220px" }}
        display={{ base: 'none', md: 'block' }}
        zIndex={10}
        overflowY="auto"
        p={2}
      >
        <Flex
          flexDir="column"
          justify="space-between"
          bg={secBgColor}
          p={3}
          borderRadius={12}
          h="calc(88vh - 16px)"
        >
          <Box>
            <SidebarItems />
            <Flex
              as="button"
              
              p={2}
              color="ui.danger"
              fontWeight="bold"
              alignItems="center"
              >
              <FiLogOut />
              <Text ml={2}>Log out</Text>
            </Flex>
          </Box>
            <Text
            color="gray.600"
              className="text-xs text-gray-500"
            >
              Logged in as: Walter Wannacio
            </Text>
        </Flex>
      </Box>
      
      {/* Spacer to push content to the right on desktop */}
      <Box display={{ base: 'none', md: 'block' }} w="220px" flexShrink={0} />
      </Flex>


      <Box height="100vh" display="flex" minW="66%" mr={4} flexDirection="column">
        <Button py={2} mx={3} color={color} onClick={start}><FaMicrophone /><Text className="ml-2">Start Recording</Text></Button>
        {/* Chart Grid */}
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 2 }}
          flex={1}
          templateColumns="repeat(2, 1fr)"
          gap={2}
          p={4}
        >
          {/* Pie Chart */}
          <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md" h={"90%"}>
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
                    outerRadius={150}
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
          <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md" h={"90%"}>
            <Heading size="md" mb={4} color="gray.600">
              Portfolio Backtest
            </Heading>
            {results && (
              <ChartContainer config={chartConfig}>
                <AreaChart data={results.time_serie}>
                  <CartesianGrid />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={true}
                    tickMargin={8}
                    tickFormatter={(value) => format(new Date(value), 'MMM dd')}

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
            <Table size={'sm'}>
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
            <Table size={'sm'}>
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
      
      <Flex minW={"20%"}>
      <Card className='flex-row h-[88.5vh] rounded-md'>
        <div className ="w-95 relative z-0" mb={"4em"}>
        <Heading size="md"  p={4} color="gray.600">
              Client Profile
            </Heading>
            <p className="px-4 italic text-gray-500 text-justify mr-3">
                {results.info}
        </p>
        </div>
        

        
      </Card>
      </Flex>
    </Flex>
  );
}

export default Charts;
