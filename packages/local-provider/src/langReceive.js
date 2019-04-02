import { LangContext } from './langContext';
export default function langReceive(){
    return (
        <LangContext.Consumer>
            {this.props.children}
        </LangContext.Consumer>
    )
}