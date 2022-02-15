import  React, {useState, useEffect} from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
import { getCompaniesByCountry } from '../API/Userapis';
import {getFlag} from '../API/LocalStore';

const Label = styled('label')({
    display: 'block',
});

const Input = styled('input')(({ theme }) => ({
    width: 200,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
}));

const Listbox = styled('ul')(({ theme }) => ({
    width: '92%',
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    fontSize: '14px',
    border: '1px solid rgba(0,0,0,.25)',
    '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
    },
    '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
    },
}));

export default function UseAutocomplete() {
    
    const [CompaniesListArray, setCompaniesListArray] = useState([]);
    useEffect(() => {
        getCompaniesByCountry('0', '0', '0').then(meta => {
            setCompaniesListArray(meta)
        });
    }, []);
    
    
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'use-autocomplete-demo',
        options: CompaniesListArray,
        getOptionLabel: (option) => option.Company_Name || option.SymbolTicker,
    });

    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    return (
        <div>
            <div {...getRootProps()}>
            <div className='searchinputbox_homepage'>
                <img src="/assets/icons/search_icon_light.svg" />
                    <input type="text" {...getInputProps()} autoFocus={true} name="search" className="global_search_input" id="search" placeholder="Search" />
            </div>
            </div>
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                    {groupedOptions.map((option, index) => (
                        <div key={index} onClick={() => console.log(option.id)} style={{"display":"flex", "height":"35px", "alignItems":"center"}}>
                            <div style={{ "width": "50px" }}><img style={{ "maxWidth": "50px", "maxHeight": "30px", "objectFit": "contain", "paddingLeft": "3px", "paddingRight": "3px" }} srcSet={getFlag(option.Country)} /></div> <li style={{"textOverflow": "ellipsis", "fontSize": "12px", "color": "grey", "lineHeight": "1.5em", "height": "1.6em", "overflow" : "hidden"}} {...getOptionProps({ option, index })}>{option.Company_Name}</li>
                        </div>
                    ))}
                </Listbox>
            ) : null}
        </div>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

