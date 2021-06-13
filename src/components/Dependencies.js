import React, { useState, useEffect } from 'react';
import _ from "lodash";
import data from "../assets/complex-package.json";
import DependenciesList from "../components/DependenciesList";

function generateInitialPackages(packages, parentKey = null) {
  const _packages = {...packages};
  for (const key in _packages) {
    const item = _packages[key];
    
    if (_.isObject(item)) {
      
      for (const itemKey in item) {
        if (_.isObject(item[itemKey])) {
          item[itemKey].key = Math.random().toString(36).substring(2);
          item[itemKey].isCollapse = false;
          item[itemKey].isChecked = false;
          item[itemKey].parentKey = parentKey;
          generateInitialPackages(item[itemKey], item[itemKey].key);
        }
      }
    }
  }
  return _packages;
}

function findAndReplace(name, packages, targetKey, isCollapse) {
  const _packages = {...packages};
  for (const key in _packages) {
    const item = _packages[key];
    if (_.isObject(item)) {
      for (const itemKey in item) {
        
        if (_.isObject(item[itemKey]) && itemKey === name && item[itemKey].key === targetKey) {
          item[itemKey].isCollapse = isCollapse;
         
        }else{
          findAndReplace(name, item[itemKey], targetKey, isCollapse);
        }
      }
    }
  }
  return _packages;
}

function toggleChildren(packageObj){
  if(_.isObject(packageObj) ){
    for (const key in packageObj) {
     let packageItem = packageObj[key];
     if(_.isObject(packageItem) ){
      //  packageItem.isChecked = !packageItem.isChecked;
        toggleChildren(packageItem)
      }
    }
  }
  return packageObj;
}
function toggleSelection(name, packages, itemKey, isChecked){

  const _packages = {...packages};
  // find selected object.
  for (const key in _packages) {
    let parentItem = _packages[key];
    if(_.isObject(parentItem) ){
      for (const childKey in parentItem) {
        let childItem = parentItem[childKey];
        if(_.isObject(childItem) && childKey === name && childItem.key === itemKey){
          if(_.has(childItem, 'isChecked')){
            childItem.isChecked = !childItem.isChecked;
            childItem = toggleChildren(childItem.dependencies)
           // toggleSelection(name, childItem, childKey, isChecked)
          }
        }
        else{
          toggleSelection(name, childItem, childKey, isChecked)
        }
      }
      
    }
  }


  return _packages;
}



function createHashForObjDep(packages) {
  const _packages = {...packages};
  const hash = {};
  for (const key in _packages) {
    const item = _packages[key];
    
    if (_.isObject(item)) {
      
      
      for (const itemKey in item) {

           let tempkey =  Math.random().toString(36).substring(2);
      hash[tempkey] = {};
        if(_.isObject(item[itemKey]) ){
          
          console.log('item', item[itemKey]);
        }

        if( _.isObject(item)){
          console.log('item', item);
        }
       
        // {xcxcdfs3:{isChecked:false}}
      //   let tempkey =  Math.random().toString(36).substring(2);
      // hash[tempkey] = {};
      // hash[tempkey].isCollapse = item.isCollapse;
      // hash[tempkey].isChecked = item.isChecked;
      // hash[tempkey].name = item.name;
      // hash[tempkey].parentKey = item.parentKey;
        
        // if (item['key']) {
        //   console.log('here????');
        //   hash[item.key] = {};
        //   hash[item.key].isCollapse = item.isCollapse;
        //   hash[item.key].isChecked = item.isChecked;
        //   hash[item.key].name = item.name;
        //   hash[item.key].parentKey = item.parentKey;
        // }
        // if (_.isObject(item[itemKey])) {
        //   hash[item[itemKey].key] = {};
        //   hash[item[itemKey].key].isCollapse = item[itemKey].isCollapse;
        //   hash[item[itemKey].key].isChecked = item[itemKey].isChecked;
        //   hash[item[itemKey].key].name = item[itemKey].name;
        //   hash[item[itemKey].key].parentKey = item[itemKey].parentKey;
       createHashForObjDep(item[itemKey]);
        // }
      }
    }
  }
 
  return hash;
}

export default function Dependencies() {
  const [selected, setSelected] = useState('');
  const[packages, setPackages] = useState(null);
  const [toggleChildren, setSelection] = useState(false);
  const [hash, setHash] = useState(null);

  useEffect(() => setPackages(generateInitialPackages(data)), []);
  // useEffect(() => {
  //   const res = createHashForObjDep(packages);
  //   console.log(res);
  //   setHash(res);
  // }, [packages]);

  console.log(packages);

  const updateCollapse = (name, key, isCollapse) => {
    const pack = findAndReplace(name, packages, key, isCollapse);
    setPackages(pack);
  }


  const toggleSelectionChildren = (name, itemKey, isChecked)=>{
    //return isChecked = !isChecked
   // setSelection(isChecked = !isChecked)
   const pack = toggleSelection(name, packages, itemKey, isChecked);
   setPackages(pack);
    console.log(packages);
  }

  return packages && (
    <>
      <DependenciesList
        data={packages}
        updateCollapse={updateCollapse}
        selected={selected}
        setSelection={toggleSelectionChildren}
        setSelected={setSelected}
        toggleSelectionChildren={toggleSelectionChildren}
        
        />
    </>
  );
}
