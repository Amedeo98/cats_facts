import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CatLoad from './cat_load';
import { fetchCatFactsList } from '../store/actions/cat_fact';
import '../styles/cat.css';

function CatFact({ selectedCatFact, facts, fetchCatFactsList, loading, error }) {
    const { index } = useParams();
    const [localSelectedCatFact, setLocalSelectedCatFact] = useState(null);

    useEffect(() => {
        const catFactIndex = parseInt(index, 10);

        // Verifica se il cat_fact è già presente nella lista
        if (!facts || !facts.list || facts.list.length === 0) {
            fetchCatFactsList();
        } else {
            // Assegna il cat_fact selezionato
            setLocalSelectedCatFact(facts.list[catFactIndex]);
        }
    }, [index, facts, fetchCatFactsList]);

    // Aggiorna selectedCatFact quando lo stato locale cambia
    useEffect(() => {
        if (localSelectedCatFact) {
            selectedCatFact = localSelectedCatFact;
        }
    }, [localSelectedCatFact]);

    if (loading) {
        return <div><CatLoad /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {localSelectedCatFact ? (
                <div>
                    <h2>Cat Fact #{index}</h2>
                    <img src={localSelectedCatFact.img} alt="Cat Image" className="catImg"/>
                    <div className="description">{localSelectedCatFact.fact}</div>
                </div>
            ) : (
                <div><CatLoad /></div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        facts: state.cat_fact.facts,
        selectedCatFact: state.cat_fact.selectedCatFact,
        loading: state.cat_fact.loading,
        error: state.cat_fact.error,
    };
};

export default connect(mapStateToProps, { fetchCatFactsList })(CatFact);
