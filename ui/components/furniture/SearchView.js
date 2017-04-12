import React from 'react';
import * as styles from '../../common/styles';

function SearchView() {
  return <div className="container">
    <div className="search">
      <input type="text" placeholder="Search Product" />
      <i className="fa fa-search" aria-hidden="true" />
    </div>
    <div className="dropdown">
      <div className="select">
        <select>
          <option value="ikea">Ikea</option>
          <option value="target">Target</option>
          <option value="wallmart">Wallmart</option>
        </select>
      </div>
    </div>

    <style jsx>{`
      .container {
        display: flex;
        border-bottom: 1px solid ${styles.colorDarksmoke};
        padding: 10px 0;
      }

      .search {
        position: relative;
        flex: 1;
        padding: 0 10px;
      }
      .search i {
        font-size: 1.2em;
        position: absolute;
        right: 20px;
        top: 11px;
      }
      .search input {
        width: 100%;
        padding-right: 30px;
      }

      .dropdown {
        flex: 1;
        padding: 0 10px;
      }
      .dropdown .select {
        width: 100%;
      }
    `}</style>
  </div>;
}

SearchView.propTypes = {
};

export default SearchView;
