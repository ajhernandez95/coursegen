import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { supabase } from "../../util/supabase";

const AccountAvatar = ({ size = "sm" }: { size: string }) => {
  const handleSignOut = async () => {
    const { error } = await supabase?.auth.signOut();
    if (error) {
      console.error(error);
      return;
    } else {
      window.location.reload();
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        aria-label="Options"
        p={0}
        variant="unstyled"
        borderRadius="full"
        _focus={{ boxShadow: "none" }}
      >
        <Avatar size={size} src="https://bit.ly/broken-link" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleSignOut} icon={<BiLogOut />}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AccountAvatar;
