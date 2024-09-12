import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const Search = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  const [inputText, setInputText] = useState("");
  useEffect(() => {
    if (inputText == "") {
      axios
        .get("https://api.themoviedb.org/3/trending/movie/day?language=en-US", {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODIxZTgzMTJkMDU4MDA5MzJiOTcwODE5Y2ExZWNmYiIsIm5iZiI6MTcyNjEzNzcxNy41ODM5NzMsInN1YiI6IjY2YjVmYTljZjQ0MDA1MzE0YzA3MTBjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ie59KEsdgmwmYQh3SOI-omc27uYrCUg6pKB5zdY-BIk",
          },
        })
        .then((data) => {
          setMovies(data.data.results);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?query=${inputText}`, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODIxZTgzMTJkMDU4MDA5MzJiOTcwODE5Y2ExZWNmYiIsIm5iZiI6MTcyNjEzNzcxNy41ODM5NzMsInN1YiI6IjY2YjVmYTljZjQ0MDA1MzE0YzA3MTBjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ie59KEsdgmwmYQh3SOI-omc27uYrCUg6pKB5zdY-BIk",
          },
        })
        .then((data) => {
          setMovies(data.data.results);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [inputText]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.search}>
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search" size={24} color="grey" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchText}
            placeholder="Search games, show..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
          />
          {/* <Text style={styles.searchText}>Search games, show...</Text> */}
        </View>
        <ScrollView>
          <View style={styles.list}>
            {/* Movie 1 */}
            {movies.map((movie) => {
              return (
                <TouchableOpacity
                  style={styles.movie}
                  onPress={() => {
                    navigation.push("Single", {
                      movie: movie || {},
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
                    }} // Replace with actual image
                    style={styles.movieImage}
                  />
                  <View style={styles.movieTextContainer}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <TouchableOpacity style={styles.playButton}>
                      <Ionicons name="play-circle" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerIcon: {
    padding: 8,
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  searchText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    marginLeft: 16,
  },
  searchIcon: {
    padding: 8,
  },
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",
  },
  movie: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  movieImage: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },
  movieTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 16,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  playButton: {
    padding: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  footerButton: {
    alignItems: "center",
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Search;
