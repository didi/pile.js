import { LangContext } from './langContext';
export default class LocaleReceiver extends React.Component{
    render(){
        const { children } = this.props
        return (
            <LangContext.Consumer>
                {children}
            </LangContext.Consumer>
        )
    }
}