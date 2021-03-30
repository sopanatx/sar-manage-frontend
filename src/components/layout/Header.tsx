import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            fontFamily="Kanit"
            variant={"link"}
            href={"/"}
          >
            ออกจากระบบ
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                fontFamily="kanit"
                color={useColorModeValue("gray.600", "gray.200")}
                _hover={{
                  textDecoration: "none",
                  color: useColorModeValue("gray.800", "white"),
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={useColorModeValue("white", "gray.800")}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
            fontFamily="Kanit"
          >
            {label}
          </Text>
          <Text fontSize={"sm"} fontFamily="Kanit">
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          {/* <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} /> */}
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          fontFamily="Kanit"
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "จัดการเอกสาร",
    children: [
      {
        label: "อัปโหลดเอกสารใหม่",
        subLabel: "อัปโหลดเอกสารใหม่ไปยังแต่ละหัวข้อ",
        href: "#",
      },
      {
        label: "จัดการเอกสาร",
        subLabel: "จัดการ / แก้ไขเอกสารที่อัปโหลดไปแล้ว",
        href: "#",
      },
      {
        label: "ประวัติ",
        subLabel: "ประวัติการเข้าถึงเอกสาร / อัปโหลด / แก้ไข",
        href: "#",
      },
    ],
  },

  {
    label: "จัดการบัญชี",
    children: [
      {
        label: "แก้ไขข้อมูลบัญชี",
        subLabel:
          "จัดการแก้ข้อมูลทั่วไปเกี่ยวกับบัญชี เช่น เปลี่ยนชื่อ , อีเมล",
        href: "#",
      },
      {
        label: "เปลี่ยนรหัสผ่าน",
        subLabel: "เปลี่ยนรหัสผ่านของบัญชีนี้สำหรับการเข้าสู่ระบบ",
        href: "#",
      },
    ],
  },
  {
    label: "ค้นหาเอกสาร",
    href: "#",
  },
  {
    label: "จัดการระบบ",
    children: [
      {
        label: "เพิ่มปีการศึกษา",
        subLabel: "จัดการปีการศึกษาหรือปิด/เปิด ปีการศึกษาในระบบ",
        href: "#",
      },
      {
        label: "จัดการหัวข้อเอกสาร",
        subLabel: "จัดการเพิ่มหัวข้อเอกสาร แก้ไขหัวข้อเอกสาร หริือปิดเปิดเมนู ",
        href: "#",
      },
      {
        label: "จัดการผู้ใช้งานระบบ",
        subLabel: "จัดการสิทธิ์ของผู้ใช้งาน หรือแก้ไขข้อมูลส่วนตัวของผูัใช้",
        href: "#",
      },
      {
        label: "ตั้งค่าข้อมูลระบบ",
        subLabel:
          "ปรับเปลี่ยนเมนูการตั้งค่าของระบบเว็บทั้งหมดเช่น ชื่อระบบ / ปิดเปิดระบบ และอื่นๆ",
        href: "#",
      },
      {
        label: "ดู Log ของระบบ",
        subLabel:
          "ดูประวัติการเข้าถึงระบบทั้งหมด เช่น ประวัติการ Login / อัปโหลดเอกสาร / สถิติ",
        href: "#",
      },
    ],
  },
];
