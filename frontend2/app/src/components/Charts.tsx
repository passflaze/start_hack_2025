import {
    Box,
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
  import {PieChartComponent} from "../../../../frontend2/app/src/components/charts/PieChart";
  import {UserHeader} from "./common/UserHeader";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer } from "recharts";
  
  let demoUser = {
    name: "Jack Major",
    age: 22,
    netWorth: "$1,000,000"
  }

  // Sample data for charts
  const data = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
  ];

  function Charts() {
    return (

      <Container maxW="full">
        
        <Box height="100vh" display="flex" flexDirection="column">
        <UserHeader user={demoUser} />
          
  
          {/* Chart Grid */}
          <Grid flex={1} templateColumns="repeat(2, 1fr)" gap={4} p={4}>

            {/* Pie Chart */}
            <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4} color="gray.600">
                Asset Allocation
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#4299E1"
                  />
                </PieChart>
              </ResponsiveContainer>
            </GridItem>

             {/* Area Chart */}
             <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4} color="gray.600">
                Portfolio Backtest
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <Area type="monotone" dataKey="value" fill="#ECC94B" stroke="#D69E2E" />
                </AreaChart>
              </ResponsiveContainer>
            </GridItem>

            {/* Line Chart */}
            <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4} color="gray.600">
                Financial Indexes
              </Heading>
            <Table>
                <Thead>
                    <Th borderRight="1px solid"  borderColor="gray.200">Index</Th>
                    <Th>Ratio</Th>
                </Thead>
                <Tbody>
                    <Tr>
                        <Th borderRight="1px solid" borderColor="gray.200">Sharpe Ratio</Th>
                        <Td 
                        ></Td>
                    </Tr>
                    <Tr>
                        <Th borderRight="1px solid"  borderColor="gray.200">Sortino Ratio</Th>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Th borderRight="1px solid"  borderColor="gray.200">Calmar Ratio</Th>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Th borderRight="1px solid"  borderColor="gray.200">Information Ratio</Th>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Th borderRight="1px solid"  borderColor="gray.200">Treynor Ratio</Th>
                        <Td></Td>
                    </Tr>
                </Tbody>
            </Table>
            </GridItem>
  
            {/* Bar Chart */}
            <GridItem bg="white" p={4} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4} color="gray.600">
                Portfolio Metric
              </Heading>
              <Table>
                <Thead>
                    <Th borderRight="1px solid"  borderColor="gray.200">Metric</Th>
                    <Th>Value</Th>
                </Thead>
                <Tbody>
                    <Tr>
                        <Th borderRight="1px solid" borderColor="gray.200">Alpha</Th>
                        <Td 
                        ></Td>
                    </Tr>
                    <Tr>
                        <Th borderRight="1px solid"  borderColor="gray.200">Beta</Th>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Th borderRight="1px solid"  borderColor="gray.200">Maximum Drawdon</Th>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Th borderRight="1px solid"  borderColor="gray.200">Value at Risk</Th>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Th borderRight="1px solid"  borderColor="gray.200">Total Return</Th>
                        <Td></Td>
                    </Tr>
                </Tbody>
            </Table>
            </GridItem>
  
           
  
            
          </Grid>
        </Box>
    </Container>
    );
  }

  export default Charts