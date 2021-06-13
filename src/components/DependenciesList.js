import React, { useEffect, useState } from "react";
import PackageName from '../components/PackageName';
import _ from "lodash";

const hasChildren = (item) => {
  if (_.isObject(item)) {
    for (const key in item){
      if (_.isObject(item[key])) {
        return true;
      }
    }
  }
  return false;
}

const DependenciesList = ({ data, selected, setSelected, updateCollapse,toggleSelectionChildren, setSelection }) => {
  return (
    <div >
      {Object.keys(data.dependencies).map((itemKey, index) => {
        let name, version;
        const item = data.dependencies[itemKey];
        if (item.name === undefined) {
          name = itemKey;
          version = item;
          
        }
        else {
          name = item.name;
          version = item.version;
        }
       
        const isHasChildren = hasChildren(item);
        const getCheckedStatusOfParent = (itemKey) => {
          // TODO: implement
          return true;
        }
        const renderPackageName = () => (

            <ul className="dependencies-container parentItem" >
                <li key={Math.random().toString(36).substring(2)} >
                  
                  <PackageName isObject={isHasChildren}
                   name={`${name} ${version}`}
                   keyName={item.key ? item.key : ''}
                  selected={selected === name}
                  setSelection={setSelection}
                  onSelected={() => setSelected(name)}
                  onCheckClick={() => toggleSelectionChildren(name, item.key, item.isChecked)}
                  isCollapse={item.isCollapse}
                  isChecked={item.isChecked} //{isHasChildren ? item.isChecked : getCheckedStatusOfParent(item.key)}
                  onChevronClick={() => updateCollapse(name, item.key, !item.isCollapse)}
                  isHasChildren={isHasChildren}
                    />
                    {isHasChildren && item.isCollapse && 
                      <DependenciesList data={item} isHasChildren={isHasChildren} selected={selected} setSelected={setSelected} updateCollapse={updateCollapse} toggleSelectionChildren={toggleSelectionChildren}/>}
                </li>
              </ul>
          )

        return (
          <div key={itemKey} >
          {renderPackageName()}
          </div>
        );
      })}
    </div>
  );
}
export default DependenciesList;