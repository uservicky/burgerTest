import React from 'react';
import Auxi from '../../hoc/Auxi';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

const layout = (props) => (
    <Auxi>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxi>
);



export default layout;