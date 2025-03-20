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
import PieChartComponent from "../../../../frontend2/app/src/components/charts/PieChart";

function Charts() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={12}>
        Analisi
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={4}>
        <PieChartComponent/>
      </SimpleGrid>
    </Container>
  );
}

export default Charts;
