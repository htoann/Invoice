import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { TagStyle } from './style';

const { CheckableTag } = TagStyle;

function Tag(props) {
  const [state, setState] = useState({
    checked: true,
    selectedTags: [],
  });

  const { closable, onClose, color, checked, onChange, data, hotTags, animate, children } = props;
  const tagsFromServer = data;

  const log = (e) => {
    onClose(e);
  };

  const handleChange = (checked) => {
    setState({ ...state, checked });
    if (onChange) onChange(checked);
  };

  const handleChangeHot = (tag, checked) => {
    const { selectedTags } = state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    setState({
      ...state,
      selectedTags: nextSelectedTags,
    });
    if (onChange) onChange(nextSelectedTags);
  };

  const { selectedTags } = state;

  return checked ? (
    <CheckableTag props={props} checked={state.checked} onChange={handleChange} />
  ) : hotTags ? (
    <>
      <span style={{ marginRight: 8 }}>Categories:</span>
      {tagsFromServer.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={(checked) => handleChangeHot(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </>
  ) : animate ? (
    <AnimatedTags data={data} onChange={onChange} />
  ) : (
    <TagStyle closable={closable} onClose={log} color={color}>
      {children}
    </TagStyle>
  );
}

Tag.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  color: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  hotTags: PropTypes.bool,
  animate: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
};

function AnimatedTags(props) {
  const { data, onChange } = props;
  const [state, setState] = useState({ tags: data, inputVisible: false, inputValue: '' });

  const handleClose = (removedTag) => {
    const tags = state.tags.filter((tag) => tag !== removedTag);
    setState({ tags });
    if (onChange) onChange(tags);
  };

  const showInput = () => {
    setState({ ...state, inputVisible: true });
  };

  const handleInputChange = (e) => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    if (onChange) onChange(tags);
    setState({
      ...state,
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  const forMap = (tag) => {
    const tagElem = (
      <TagStyle
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </TagStyle>
    );

    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const { tags, inputVisible, inputValue } = state;
  const tagChild = tags.map(forMap);

  return (
    <div>
      <div style={{ marginBottom: 10 }}>{tagChild}</div>

      {inputVisible && (
        <Input
          autoFocus
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}

      {!inputVisible && (
        <TagStyle className="invoice-tag-new" onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined /> New Tag
        </TagStyle>
      )}
    </div>
  );
}

AnimatedTags.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
};

export { Tag };
