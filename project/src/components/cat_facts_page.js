import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCatFactsList } from '../store/actions/cat_fact';
import '../styles/homepage.css';
import CatLoad from './cat_load';
import CatCard from './cat_card';

function CatFactsPage({ facts, loading, error }) {
    useEffect(() => {
        console.log('page!')
    }, []);

    if (loading) {
        return <div><CatLoad></CatLoad></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    //load 10 facts per page as the api tells, I got the facts_to_show number, then i sliced the list to this number
    //fetching every time causes a page render that breaks the user experience 
    let facts_to_show = facts.current_page * 10;

    return (
        <div className="cat_facts_container">
            {facts && facts.list && facts.list.slice(0, facts_to_show).map((cat_fact, index) => {
                return (
                    <CatCard cat_fact={cat_fact} key={index} index={index}></CatCard>
                )
            }
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        facts: state.cat_fact.facts,
        loading: state.cat_fact.loading,
        error: state.cat_fact.error,
    };
};

export default connect(mapStateToProps)(CatFactsPage);
