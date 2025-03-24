import React from "react";
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { FiHome} from "react-icons/fi";



import { GrUserWorker } from "react-icons/gr";


import { FaChartLine } from "react-icons/fa6";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { BiSolidObjectsVerticalBottom } from "react-icons/bi";
import { IoIosStarHalf } from "react-icons/io";
import { FaMoneyBillWave } from "react-icons/fa";


const items = [
  { icon: FiHome, title: "Dashboard", path: "/" },
  { icon: FaChartPie, title: "Overview", path: "/a" },
  { icon: FaChartLine, title: "Portfolio", path: "/a" },
  { icon: IoChatbubbleOutline, title: "Open position", path: "/a" },
  { icon: GrUserWorker, title: "User Profile", path: "/a" },
  { icon: FaMoneyBillWave, title: "Priorities", path: "/a" },
  { icon: IoIosStarHalf, title: "Goals", path: "/a" },
  { icon: BiSolidObjectsVerticalBottom, title: "Asset", path: "/a" },
  { icon: IoPeopleOutline, title: "Similar", path: "/a" },
  
];


interface SidebarItemsProps {
  onClose?: () => void;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ onClose }) => {
  const textColor = useColorModeValue("ui.main", "ui.white");
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568");



  const NavigationItem = ({ item }: { item: (typeof items)[0] }) => {
    const isActive = location.pathname === item.path;

    return (
      <Flex
        w="100%"
        p={2}
        style={isActive ? { background: bgActive, borderRadius: "12px" } : {}}
        color={textColor}
        onClick={onClose}
        position="relative"
        borderWidth={"0px"} // Thicker border
        borderStyle="solid"
        borderColor={"transparent"}
        borderRadius="12px"
        boxShadow={"none"} // Glowing effect
        transition="all 0.3s ease-in-out" // Smooth transition
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex alignItems="center">
          <Icon
            as={item.icon}
            alignSelf="center"
            color={"inherit"}
            animation={"none"}
          />
          <Text ml={2}>{item.title}</Text>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
      {items.map((item) => (
        <NavigationItem key={item.title} item={item} />
      ))}
    </Box>
  );
};

export default SidebarItems;
