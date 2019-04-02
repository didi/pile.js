import * as React from 'react';
import { LangContext } from './langContext';
export default class LocalProvider extends React.Component{
    render() {
        const { lang, children } = this.props
        return (
            <LangContext.Provider value={lang}>
                {children}
            </LangContext.Provider>
        )
    }
}