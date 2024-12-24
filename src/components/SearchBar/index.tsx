import React, { FC } from 'react';
import { DataItem } from '../../types';
import searchIcon from '../../common/icons/SearchIcon.svg';
import scheduleIcon from '../../common/icons/ScheduleIcon.svg';
import closeIcon from '../../common/icons/CloseIcon.svg';
import './index.css';

type SearchBarProps = {
    query: string;
    autocomplete: DataItem[];
    showAutocomplete: boolean;
    history: string[];
    onRemoveHistoryItem: (item: string) => void;
    onInputChange: (value: string) => void;
    onKeyPress: () => void;
    onAutocompleteClick: (item: DataItem) => void;
    onBlur: () => void;
    onFocus: () => void;
    onClear: () => void;
};

const SearchBar: FC<SearchBarProps> = ({
    query,
    autocomplete,
    history,
    showAutocomplete,
    onRemoveHistoryItem,
    onInputChange,
    onKeyPress,
    onAutocompleteClick,
    onBlur,
    onFocus,
    onClear,
}) => {
    const isAutocompleteVisible = showAutocomplete && autocomplete.length > 0;

    return (
        <div className='search-container'>
            <div className='search-bar'>
                <img className='search-icon' src={searchIcon} alt='search'/>
                <input
                    className='search-input'
                    id='search-input'
                    type='text'
                    value={query}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={onKeyPress}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onClick={onFocus}
                    placeholder='Search...'
                    autoFocus
                />
                {query && <img className='close-icon' onClick={onClear} src={closeIcon} alt='remove'/>}
            </div>

            {isAutocompleteVisible && (
                <ul className='autocomplete-list' onMouseDown={(e) => e.preventDefault()}>
                    {autocomplete.map((item) => {
                        const isHistoryItem = history.some(historyItem => historyItem.toLowerCase() === item.title.toLowerCase());
                        return (
                            <li
                                className='autocomplete-item'
                                key={item.id}
                            >
                                <div className='autocomplete-content' onClick={() => onAutocompleteClick(item)}>
                                    <img className='icon' src={isHistoryItem ? scheduleIcon : searchIcon} alt='search'/>
                                    <span className={`autocomplete-title${isHistoryItem ? ' history-item' : ''}`}>{item.title}</span>
                                </div>
                                {isHistoryItem && <img className='icon' onClick={() => onRemoveHistoryItem(item.title)} src={closeIcon} alt='remove'/>}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;