import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      // Add searchQuery to recent searches if not already present
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches([searchQuery, ...recentSearches]);
      }
      // Placeholder for backend search logic
      console.log('Performing search for:', searchQuery);
      // Reset search query after the search
      setSearchQuery('');
    }
  };

  const handleRecentSearch = (query) => {
    setSearchQuery(query);
    // Placeholder for re-running a search based on recent search item
    console.log('Re-performing search for:', query);
  };

  const clearRecentSearch = (query) => {
    setRecentSearches(recentSearches.filter(item => item !== query));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name='search' size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <Text style={styles.header}>RECENT SEARCHES</Text>
      <FlatList
        data={recentSearches}
        renderItem={({ item }) => (
          <View style={styles.recentItem}>
            <TouchableOpacity onPress={() => handleRecentSearch(item)}>
              <Text style={styles.recentText}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => clearRecentSearch(item)}>
              <Ionicons name="close" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.noRecentText}>No recent searches</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3C5AD',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'black',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  recentText: {
    color: 'white',
    fontSize: 16,
  },
  noRecentText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Search;
