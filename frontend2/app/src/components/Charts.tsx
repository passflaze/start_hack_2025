import {
    Container,
    Grid,
    GridItem,
    Heading,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
  } from "@chakra-ui/react";
  import {PieChartComponent} from "../../../../frontend2/app/src/components/charts/PieChart";
  import {UserHeader} from "./common/UserHeader";
  
  let demoUser = {
    name: "JACK MAGGIORE",
    age: 22,
    netWorth: "$1,000,000"
  }

  function Charts() {
    return (

      <Container maxW="full">
        
        < UserHeader user={demoUser} />
  
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={4}>
          <PieChartComponent/>
          <PieChartComponent/>
          <PieChartComponent/>
          <PieChartComponent/>
        </SimpleGrid>
      </Container>
    );
  }
  
  export default Charts;
  