import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import ResultsList from '../../components/ResultsList';
import { DataItem } from '../../types';
import { DATA, ENTER_KEY, MAX_ITEMS } from '../../utils/const';
import './index.css';

const SearchPage = () => {
    const [query, setQuery] = useState<string>('');
    const [autocomplete, setAutocomplete] = useState<DataItem[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [results, setResults] = useState<DataItem[]>([]);
    const [showAutocomplete, setShowAutocomplete] = useState<boolean>(true);

    useEffect(() => {
        if (query === '') {
            setResults([]);
            setShowAutocomplete(false);
        }
    }, [query]);

    const handleInputChange = useCallback((value: string) => {
        setQuery(value);
        setShowAutocomplete(true);

        const suggestions = value
            ? DATA.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
            : [];

        const historyItems = searchHistory.map((item, i) => ({ id: item + i, title: item }));
        const nonHistoryItems = suggestions.filter(item => !searchHistory.includes(item.title));

        if (value && !searchHistory.includes(value)) {
            historyItems.unshift({ id: value, title: value });
        }

        const sortedSuggestions = [...historyItems, ...nonHistoryItems].slice(0, MAX_ITEMS);

        setAutocomplete(sortedSuggestions as DataItem[]);
    }, [searchHistory, setQuery]);

    const addToHistory = useCallback((searchQuery: string) => {
        if (!searchHistory.some(item => item.toLowerCase() === searchQuery.toLowerCase())) {
            setSearchHistory(prev => [...prev, searchQuery]);
        }
    }, [searchHistory]);

    const handleSearch = useCallback((searchQuery: string) => {
        setResults(DATA.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())));
        addToHistory(searchQuery);
        setShowAutocomplete(false);
    }, [addToHistory]);

    const handleAutocompleteClick = useCallback((item: DataItem) => {
        setQuery(item.title);
        handleSearch(item.title);
    }, [handleSearch]);

    const handleKeyPress = useCallback((e?: KeyboardEvent) => {
        if (query && e?.key === ENTER_KEY) {
            handleSearch(query);
        }
    }, [query, handleSearch]);

    const handleRemoveHistory = useCallback((item: string) => {
        setSearchHistory(prev => prev.filter(historyItem => historyItem !== item));
    }, []);

    return (
        <div className='search-page'>
            <SearchBar
                query={query}
                autocomplete={autocomplete}
                showAutocomplete={showAutocomplete}
                history={searchHistory}
                onInputChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onAutocompleteClick={handleAutocompleteClick}
                onRemoveHistoryItem={handleRemoveHistory}
                onBlur={() => setShowAutocomplete(false)}
                onFocus={() => setShowAutocomplete(true)}
                onClear={() => setQuery('')}
            />
            {results.length > 0 && <ResultsList results={results} />}
        </div>
    );
}

export default SearchPage;
