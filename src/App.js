import "./App.css";
import Card from "./Card";
import { useEffect, useState } from "react";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Language as LanguageIcon,
  Business as BusinessIcon,
  LocalMovies as LocalMoviesIcon,
  FitnessCenter as FitnessCenterIcon,
  Science as ScienceIcon,
  DirectionsBike as DirectionsBikeIcon,
  Memory as MemoryIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import AndroidIcon from "@mui/icons-material/Android";
import LinearProgress from "@mui/material/LinearProgress";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: "auto",
  width: "50%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "50%",
    margin: "auto",
  },
}));

const icons = [
  <LanguageIcon />,
  <BusinessIcon />,
  <LocalMoviesIcon />,
  <FitnessCenterIcon />,
  <ScienceIcon />,
  <DirectionsBikeIcon />,
  <MemoryIcon />,
];

const topHeadlinesUrl = "https://shauryasuman.pythonanywhere.com/topHeadlines";
const businessUrl = "https://shauryasuman.pythonanywhere.com/business";
const entertainmentUrl =
  "https://shauryasuman.pythonanywhere.com/entertainment";
const healthUrl = "https://shauryasuman.pythonanywhere.com/health";
const scienceUrl = "https://shauryasuman.pythonanywhere.com/science";
const sportsUrl = "https://shauryasuman.pythonanywhere.com/sports";
const technologyUrl = "https://shauryasuman.pythonanywhere.com/technology";

export default function App() {
  const [url, setUrl] = useState(topHeadlinesUrl);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [constData, setConstData] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const urlHandler = (text) => {
    if (text === "Top stories") {
      setUrl(topHeadlinesUrl);
      setIsLoading(true);
    }
    if (text === "Business") {
      setUrl(businessUrl);
      setIsLoading(true);
    }
    if (text === "Entertainment") {
      setUrl(entertainmentUrl);
      setIsLoading(true);
    }
    if (text === "Health") {
      setUrl(healthUrl);
      setIsLoading(true);
    }
    if (text === "Science") {
      setUrl(scienceUrl);
      setIsLoading(true);
    }
    if (text === "Sports") {
      setUrl(sportsUrl);
      setIsLoading(true);
    }
    if (text === "Technology") {
      setUrl(technologyUrl);
      setIsLoading(true);
    }
  };
  const searchHandler = (event) => {
    event.target.value.length >= 1
      ? setData(
          constData.filter(
            (item) =>
              item.title
                .toLowerCase()
                .includes(event.target.value.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(event.target.value.toLowerCase()) ||
              item.author
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
          )
        )
      : setData(constData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setData(json);
        setConstData(json);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [url]);

  return isLoading === true ? (
    <LinearProgress />
  ) : (
    <div className="app">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Headlines
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={searchHandler}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          hideBackdrop
          elevation="0"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{ disableScrollLock: true }}
          sx={{
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              boxSizing: "border-box",
              background: "#202124",
              width: 300,
            },
          }}
        >
          <Toolbar />
          <List
            sx={{
              [`& :hover`]: {
                backgroundColor: "#202124",
                color: "#5D8AF3",
                "& svg": {
                  fill: "#5D8AF3",
                },
              },
            }}
          >
            {[
              "Top stories",
              "Business",
              "Entertainment",
              "Health",
              "Science",
              "Sports",
              "Technology",
            ].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => urlHandler(text)}
                sx={{
                  [`& :hover`]: {
                    backgroundColor: "#202124",
                    color: "#5D8AF3",
                    "& svg": {
                      fill: "#5D8AF3",
                      color: "#5D8AF3",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: "white" }} />
              </ListItem>
            ))}
            <Divider
              sx={{ backgroundColor: "white", marginTop: 3, marginBottom: 3 }}
            />
            <ListItem
              button
              onClick={() => window.open("https://shauryasuman.netlify.app/")}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="Know The Developer"
                sx={{ color: "white" }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.news.stayUpdated"
                )
              }
            >
              <ListItemIcon sx={{ color: "white" }}>
                <AndroidIcon />
              </ListItemIcon>
              <ListItemText primary="Download App" sx={{ color: "white" }} />
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <Toolbar />
      <Card data={data} />
    </div>
  );
}
