import React, { FC, useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import { NewsData as NewsDataTypes } from '../../types';
import { formatDate } from '../../utils/formatDate';

const PAGE_SIZE = 20;

const NewsList: FC<{ newsData: NewsDataTypes[] }> = ({ newsData }) => {
  const [loadedNews, setLoadedNews] = useState<NewsDataTypes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const validateNews = (news: NewsDataTypes) => {
    return (
      news.title &&
      news.urlToImage &&
      news.publishedAt &&
      news.author &&
      true
    );
  };

  const loadMoreNews = async () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const newNews = newsData.slice(startIndex, endIndex).filter(validateNews);
    setLoadedNews((prevNews) => [...prevNews, ...newNews]);
  };

  useEffect(() => {
    if (currentPage > 1) {
      loadMoreNews();
    }
  }, [currentPage, newsData]);

  const handlePress = (url: string | undefined) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const renderNewsItem = ({ item }: { item: NewsDataTypes }) => {
    if (!validateNews(item)) {
      return null;
    }

    return (
      <View style={styles.newsItem}>
        {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.image} />}
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.source && item?.source.name}</Text>
        <Text style={styles.author}>{`Author: ${item.author}`}</Text>
        <Text style={styles.date}>{`Date: ${formatDate(item.publishedAt)}`}</Text>

        {item.url && (
          <TouchableOpacity onPress={() => handlePress(item.url)} style={styles.button}>
            <Text style={styles.buttonText}>Read More</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={loadedNews}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderNewsItem}
      ListEmptyComponent={() => <Text>Loading...</Text>}
      onEndReached={() => setCurrentPage((prevPage) => prevPage + 1)}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(25, 88, 0, 0.8)',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

export default NewsList;