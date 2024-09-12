import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
const Home = ({ navigation }) => {
  const [series, setSeries] = useState([]);
  const [movies, setMoives] = useState([]);
  const [mylist, setMylist] = useState([]);
  const [onemovie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODIxZTgzMTJkMDU4MDA5MzJiOTcwODE5Y2ExZWNmYiIsIm5iZiI6MTcyNjEzNzcxNy41ODM5NzMsInN1YiI6IjY2YjVmYTljZjQ0MDA1MzE0YzA3MTBjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ie59KEsdgmwmYQh3SOI-omc27uYrCUg6pKB5zdY-BIk",
          },
        }
      )
      .then((data) => {
        setSeries(data.data.results);
        // console.log(series);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("https://api.themoviedb.org/3/trending/movie/day?language=en-US", {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODIxZTgzMTJkMDU4MDA5MzJiOTcwODE5Y2ExZWNmYiIsIm5iZiI6MTcyNjEzNzcxNy41ODM5NzMsInN1YiI6IjY2YjVmYTljZjQ0MDA1MzE0YzA3MTBjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ie59KEsdgmwmYQh3SOI-omc27uYrCUg6pKB5zdY-BIk",
        },
      })
      .then((data) => {
        setMoives(data.data.results);
        // console.log(movies);.
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODIxZTgzMTJkMDU4MDA5MzJiOTcwODE5Y2ExZWNmYiIsIm5iZiI6MTcyNjEzNzcxNy41ODM5NzMsInN1YiI6IjY2YjVmYTljZjQ0MDA1MzE0YzA3MTBjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ie59KEsdgmwmYQh3SOI-omc27uYrCUg6pKB5zdY-BIk",
          },
        }
      )
      .then((data) => {
        setMovie(data.data.results[0]);
        setMylist(data.data.results);
        // console.log("*******************************");
        // console.log(onemovie);
        // console.log("*******************************");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>For Rahul.</Text>
          <Image
            source={{ uri: "https://placehold.co/50x50/png" }}
            style={{ width: 50, height: 50 }}
          />
        </View>

        {/* Navigation Tabs */}
        <View style={styles.navTabs}>
          <TouchableOpacity style={styles.navTab}>
            <Text style={styles.navText}>Series</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab}>
            <Text style={styles.navText}>Films</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab}>
            <Text style={styles.navText}>Categories</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Content */}
        <TouchableOpacity
          style={styles.featuredContent}
          onPress={() => {
            navigation.push("Single", {
              movie: onemovie || {},
            });
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${onemovie.poster_path}`,
            }}
            style={{
              width: "100%",
              height: 450,
              flex: 1,
              justifyContent: "space-between",
            }}
          />
          <Text style={styles.genreText}>{onemovie.original_title}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playText}>
                {" "}
                <Entypo name="controller-play" size={24} color="black" />
                Play
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.myListButton}>
              <Text style={styles.myListText}>
                <AntDesign name="check" size={24} color="white" /> My List
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Series Section */}
        <View style={styles.seriesSection}>
          <Text style={styles.sectionTitle}>Series</Text>
          <ScrollView horizontal>
            {/* {
            series.results.map((movie)=>)
           } */}
            {series.map((movie) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  key={movie.id}
                  onPress={() => {
                    navigation.push("Single", {
                      movie: movie || {},
                    });
                  }}
                >
                  <ImageBackground
                    style={styles.backgroundImage}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    }}
                  >
                    {/* Netflix and Top 10 Banner */}
                    <View style={styles.banner}>
                      <Text style={styles.netflixText}>N</Text>
                      <View style={styles.top10Banner}>
                        <Text style={styles.top10Text}>TOP </Text>

                        <Text style={styles.top10Text2}>10 </Text>
                      </View>
                    </View>

                    {/* New Episodes Tag */}
                    <View style={styles.newEpisodesTag}>
                      <Text style={styles.newEpisodesText}>New Episodes</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.seriesSection}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <ScrollView horizontal>
            {movies.map((movie, index) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  key={movie.id}
                  onPress={() => {
                    navigation.push("Single", {
                      movie: movie || {},
                    });
                  }}
                >
                  <ImageBackground
                    style={styles.backgroundImage}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    }}
                  >
                    {/* Netflix and Top 10 Banner */}
                    <View style={styles.banner}>
                      <Text style={styles.netflixText}>N</Text>
                      {index == 0 ? (
                        <View style={styles.top10Banner}>
                          <Text style={styles.top10Text}>TOP </Text>

                          <Text style={styles.top10Text2}>10 </Text>
                        </View>
                      ) : (
                        ""
                      )}
                    </View>
                    {index == 0 ? (
                      <View style={styles.newEpisodesTag}>
                        <Text style={styles.newEpisodesText}>New Season</Text>
                      </View>
                    ) : (
                      ""
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.seriesSection}>
          <Text style={styles.sectionTitle}>My List</Text>
          <ScrollView horizontal>
            {mylist.map((movie, index) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    navigation.push("Single", {
                      movie: movie || {},
                    });
                  }}
                  key={movie.id}
                >
                  <ImageBackground
                    style={styles.backgroundImage}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
                    }}
                  >
                    {/* Netflix and Top 10 Banner */}
                    <View style={styles.banner}>
                      <Text style={styles.netflixText}>N</Text>
                      {index == 0 ? (
                        <View style={styles.top10Banner}>
                          <Text style={styles.top10Text}>TOP </Text>

                          <Text style={styles.top10Text2}>10 </Text>
                        </View>
                      ) : (
                        ""
                      )}
                    </View>
                    {index == 0 ? (
                      <View style={styles.newEpisodesTag}>
                        <Text style={styles.newEpisodesText}>New Season</Text>
                      </View>
                    ) : (
                      ""
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.container2}>
          {/* Placeholder for circle icon */}
          <View style={styles.circleContainer}>
            <View style={[styles.circle, styles.smallCircle]} />
            <View style={styles.circle} />
            <View style={[styles.circle, styles.smallCircle]} />
          </View>

          {/* Main title */}
          <Text style={styles.title}>Short clips. Big Laughs.</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            It's Fast Laughs - your one-stop shop for the funniest clips on
            Netflix
          </Text>

          {/* Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to Fast Laughs</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    width: "100%",
  },
  header: {
    padding: 10,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  navTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  navTab: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  navText: {
    color: "#fff",
    fontSize: 16,
  },
  featuredContent: {
    padding: 20,
    backgroundColor: "#000",
    alignItems: "center",
  },
  genreText: {
    color: "#aaa",
    fontSize: 16,
    marginVertical: 10,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 10,
  },
  playButton: {
    backgroundColor: "#fff",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  playText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  myListButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  myListText: {
    color: "#fff",
    fontSize: 16,
  },
  seriesSection: {
    padding: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  card: {
    width: 120,
    height: 200,
    backgroundColor: "#333",
    borderRadius: 5,
    overflow: "hidden",
    margin: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between",
  },
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  netflixText: {
    color: "red",
    fontSize: 24,
    padding: 2,
    fontWeight: "bold",
  },
  top10Banner: {
    backgroundColor: "#e50914",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 3,
    borderRadius: 3,
  },
  top10Text: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  top10Text2: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "900",
  },
  newEpisodesTag: {
    backgroundColor: "#e50914",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 3,
  },
  newEpisodesText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    marginHorizontal: 5,
  },
  smallCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9aadc1",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  container2: {
    backgroundColor: "#000",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default Home;
