import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useAppState } from 'context/AppContext';
import PropTypes from 'prop-types';
import React from 'react';
import { AutoCompleteStyled } from './style';

const onSelect = () => {
  // console.log('onSelect', value);
};

const renderItem = (title, count) => {
  return {
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        {count}
      </div>
    ),
  };
};

const AutoComplete = React.memo(
  ({
    customComponent = null,
    patterns = false,
    patternButtons = false,
    width = '350px',
    onSearch = () => {},
    options = [],
    placeholder = 'Input here',
  }) => {
    const { rtl } = useAppState();

    const content =
      options?.length > 0 &&
      options.map((group) => {
        const { title, count } = group;
        return {
          label: title,
          options: [renderItem(title, <span className="certain-search-item-count">{count} people</span>)],
        };
      });

    const onSearching = (searchText) => {
      onSearch(searchText);
    };

    return customComponent ? (
      <AutoCompleteStyled options={options} style={{ width }} onSelect={onSelect} onSearch={onSearching}>
        {customComponent}
      </AutoCompleteStyled>
    ) : patterns ? (
      <AutoCompleteStyled
        className="certain-category-search"
        popupClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: 300 }}
        style={{ width }}
        options={content}
        placeholder={placeholder}
        onSearch={onSearching}
      >
        <Input
          suffix={
            patternButtons ? (
              <Button className="search-btn" style={{ [rtl ? 'marginLeft' : 'marginRight']: -20 }} type="primary">
                <SearchOutlined />
              </Button>
            ) : (
              <SearchOutlined />
            )
          }
        />
      </AutoCompleteStyled>
    ) : (
      <AutoCompleteStyled
        options={options}
        style={{ width }}
        onSelect={onSelect}
        onSearch={onSearching}
        placeholder={placeholder}
      />
    );
  },
);

AutoComplete.propTypes = {
  customComponent: PropTypes.node,
  patterns: PropTypes.bool,
  patternButtons: PropTypes.bool,
  width: PropTypes.string,
  onSearch: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
};

export { AutoComplete };
