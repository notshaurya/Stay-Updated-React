import React from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Button from "@mui/material/Button";


export default function Newscard(props) {
  const card = props.data.map((data) => {
    const title = data.title.split(" - ");
    const date = data.publishedAt.split("T");
    const time = date[1].split("Z")[0];
    const splitDate = date[0].split("-");
    const subheader =
      splitDate[2] +
      "/" +
      splitDate[1] +
      "/" +
      splitDate[0] +
      "  - " +
      time +
      "  - " +
      title[1];
    return (
      <Card
        sx={{
          maxWidth: 700,
          backgroundColor: "#202124",
          color: "white",
          border: "1px solid white",
          margin: "auto",
          marginTop: "15px",
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "20px",
        }}
      >
        <div className="innercard">
          <CardHeader
            title={title[0]}
            titleTypographyProps={{ variant: "h6" }}
            subheader={
              <Typography sx={{ color: "white" }}>{subheader}</Typography>
            }
          />
          <CardMedia
            sx={{ borderRadius: 5, flexBasis: "30px", width: "150px" }}
            component="img"
            height="100"
            image={data.urlToImage}
          />
        </div>

        <CardContent>
          <Typography sx={{ color: "white" }}>{data.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            startIcon={<NewspaperIcon />}
            onClick={() => {
              window.open(data.url);
            }}
            sx={{ color: "#5D8AF3" }}
          >
            View Full Coverage
          </Button>
          <Typography sx={{ color: "white", fontWeight: 600 }}>
            {data.author}
          </Typography>
        </CardActions>
      </Card>
    );
  });
  return card;
}
