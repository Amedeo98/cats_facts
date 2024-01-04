import React, { useEffect } from 'react';
import '../styles/homepage.css';
import { connect } from 'react-redux';
import { fetchCatFactsList } from '../store/actions/cat_fact';
import CatLoad from './cat_load';
import CatFactsPage from './cat_facts_page';
import ScrollToTopButton from './scroll_btn';

function HomePage({ facts, loading, error, fetchCatFactsList }) {
  useEffect(() => {
    if (!facts || !facts.list || facts.list.length === 0) {
      fetchCatFactsList();
    }
  }, []);

  if (loading) {
    return <div><CatLoad></CatLoad></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <div className="homepage">
        <h2>Wanna know some cats facts?</h2>
        <CatFactsPage />
      </div>
      <div>
        <button className='showmore' onClick={() => fetchCatFactsList(facts.current_page)}>Show MEOWre</button>
      </div>
      <ScrollToTopButton />
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

export default connect(mapStateToProps, { fetchCatFactsList })(HomePage);
