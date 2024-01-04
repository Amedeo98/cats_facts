export const FETCH_CAT_FACT_LIST_REQUEST = 'FETCH_CAT_FACT_LIST_REQUEST';
export const FETCH_CAT_FACT_LIST_SUCCESS = 'FETCH_CAT_FACT_LIST_SUCCESS';
export const FETCH_CAT_FACT_LIST_FAILURE = 'FETCH_CAT_FACT_LIST_FAILURE';
export const FETCH_UPDATE_PAGE = 'FETCH_UPDATE_PAGE';


const updateCatFactsList = (list) => {
    return {
        type: FETCH_CAT_FACT_LIST_SUCCESS,
        payload: list
    }
}

const updatePage = (num) => {
    return {
        type: FETCH_UPDATE_PAGE,
        payload: num
    }
}

export const fetchCatFactsList = (current_page) => {
    return async dispatch => {
        dispatch({ type: FETCH_CAT_FACT_LIST_REQUEST });
        try {
            let res;
            if (current_page) {
                current_page++;
                dispatch(updatePage(current_page));
            }
            else {
                res = await fetch('https://catfact.ninja/facts?limit=332');
                if (!res.ok) {
                    throw new Error('Error in request');
                }
                const list = await res.json();
                dispatch(updateCatFactsList(list));
            }
        }
        catch (error) {
            dispatch({ type: FETCH_CAT_FACT_LIST_FAILURE, payload: error.message });
        }
    }
};

/*
export const fetchCatFactsList = (current_page) => {
    return async dispatch => {
        dispatch({ type: FETCH_CAT_FACT_LIST_REQUEST });
        try {
            let res;
            if(current_page){
                current_page++;
                res = await fetch(`https://catfact.ninja/facts?page=${current_page}`);
            }
            else {
                res = await fetch('https://catfact.ninja/facts');
            }
            if (!res.ok) {
                throw new Error('Error in request');
            }
            const list = await res.json();
            console.log(list);
            dispatch(updateCatFactsList(list));
        }
        catch (error) {
            dispatch({ type: FETCH_CAT_FACT_LIST_FAILURE, payload: error.message });
        }
    }
};
*/