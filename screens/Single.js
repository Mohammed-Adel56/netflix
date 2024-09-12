import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const Single = ({ navigation, route }) => {
  // Check if route params exist
  if (!route.params || !route.params.movie) {
    return <Text>Loading...</Text>; // Handle missing params gracefully
  }

  const movie = route.params.movie;
  const [showmovie, setShowMovie] = useState(null); // Initialize as null
  const [gener, setgener] = useState([]);
  const fetchallGener = async () => {
    try {
      const first = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=a821e8312d05800932b970819ca1ecfb"
      );
      const send = await axios.get(
        "https://api.themoviedb.org/3/genre/tv/list?api_key=a821e8312d05800932b970819ca1ecfb"
      );

      setgener([...first.data.genres, ...send.data.genres]);
      //   console.log(gener);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setShowMovie(movie); // Set the movie details to state
    fetchallGener();
  }, [movie]);
  const getGenreNames = (genreIds) => {
    // console.log(gener);
    if (!gener.length) return []; // No genres available yet
    return genreIds.map((id) => {
      const genre = gener.find((g) => g.id === id); // Find matching genre
      return genre ? genre.name : ""; // Fallback for missing genre
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showmovie && (
        <ScrollView style={styles.container}>
          <ImageBackground
            style={styles.backgroundImage}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${showmovie?.poster_path}`,
            }}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                navigation.pop();
              }}
            >
              <Icon name="close" size={20} color="white" />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 0,
                left: 10,
              }}
            >
              <Text style={styles.title}>
                {showmovie?.original_title || showmovie?.original_name}
              </Text>
              <Text style={styles.genre}>
                {getGenreNames(showmovie.genre_ids)[0]}{" "}
                {showmovie?.vote_average}
              </Text>
            </View>
          </ImageBackground>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity style={styles.watchButton}>
              <Text style={styles.buttonText}>Watch Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recommendButton}>
              <Icon name="send" size={20} color="white" />
              <Text style={styles.recommendText}>Recommend</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.seasonText}>{showmovie?.release_date}</Text>
          <Text style={styles.movieTitle}>
            {showmovie?.name || showmovie?.title}
          </Text>
          <Text style={styles.description}>{showmovie?.overview}</Text>
          <Text style={styles.genres}>
            {getGenreNames(showmovie.genre_ids).join(", ")}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    height: 450,
    marginBottom: 15,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  genre: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  watchButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  recommendButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    marginBottom: 20,
  },
  recommendText: {
    fontSize: 14,
    color: "white",
    marginLeft: 5,
  },
  seasonText: {
    fontSize: 14,
    color: "grey",
    marginBottom: 5,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#d4d4d4",
    marginBottom: 10,
  },
  tags: {
    fontSize: 14,
    color: "white",
    fontWeight: "900",
  },
  genres: {
    fontSize: 16,
    color: "white",
    marginBottom: 35,
  },
});

export default Single;
