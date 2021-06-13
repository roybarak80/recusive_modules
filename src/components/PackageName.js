import React, { useState } from 'react';
import ToggleButton from './ToggleButton';

const PackageName = ({
    isChecked,
    selected,
    name,
    isObject,
    id,
    onCheckClick,
    onSelected,
    isCollapse,
    onChevronClick,
    style,
    keyName,
    isHasChildren,
}) => {

  //  const isCheckedAll = isHasChildren ? isChecked = !isChecked : false; 
    const [checked, setChecked] = useState(isChecked);
    return (
        <div style={{ ...style, color: selected ? 'red' : ( isHasChildren ?'#22baf5' : 'orange'), cursor: 'pointer' }} onClick={onSelected} >
            <input checked={isObject ? isChecked : checked } onChange={(e) => {
                e.stopPropagation();
                isObject ? onCheckClick(isChecked) : setChecked(!checked)
            }} 
            type="checkbox" />
            {name}
            <span>&nbsp;&nbsp;&nbsp;</span>
            {isObject && <ToggleButton isCollapse={isCollapse} onClick={onChevronClick} />}
        </div>
    )
}
export default PackageName;