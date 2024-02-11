import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import fetchApi from '../../utils/fetch';
import NewsList from '../../components/NewsList/NewsList';

const Home = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        const apiResponse = await fetchApi();
        const articles = apiResponse.articles || [];
  
        setNewsData(articles);
      } catch (error) {
        console.error(error);
      }
    };

    loadNewsData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <NewsList newsData={newsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(25, 88, 0, 0.8)',
  },
});

export default Home;