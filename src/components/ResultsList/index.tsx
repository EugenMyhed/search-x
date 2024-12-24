import React from 'react';
import { DataItem } from '../../types';
import './index.css';

type ResultsListProps = {
    results: DataItem[];
};

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
    return (
        <div className='results-container'>
            <p className='title'>Found {results.length} results</p>
            <ul className='results-list'>
                {results.map(result => (
                    <li className='result-item' key={result.id}>
                        <a className='link' href={result.link} rel='noreferrer' target='_blank'>{result.title}</a>
                        <p className='description'>{result.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultsList;