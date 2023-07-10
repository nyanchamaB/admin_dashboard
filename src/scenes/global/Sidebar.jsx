import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
//import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventIcon from '@mui/icons-material/Event';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReportIcon from '@mui/icons-material/Report';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/splash.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ken Njuguna
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  System Admin
                </Typography>
              </Box>
            </Box>
          )}
 
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
              <Item
                title="Students"
                to="/students"
                icon={<Diversity1Icon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Teachers"
                to="/teachers"
                icon={<HistoryEduIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            
          
            <Item
              title="Exams"
              to="/exams"
              icon={<AutoStoriesIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Administration"
              to="/admin"
              icon={<AdminPanelSettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Accounts"
              to="/accounts"
              icon={<AccountTreeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Others
            </Typography>
            <Item
              title="Events"
              to="/calendar"
              icon={<EventIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Reports"
              to="/reports"
              icon={<ReportIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="Notifications"
              to="/notifications"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
             <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           <Item
           title="Profile"
           to="/profile"
           icon={<PersonIcon/>}
           selected={selected}
           setSelected={setSelected}
            />
          
            <Item
              title="Logout"
              to="/logout"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
           
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
