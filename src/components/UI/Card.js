import calsses from './Card.module.css';
const card = (props) =>{
return (
    <div className= {calsses.card}>
        {props.children}
    </div>
);
};
export default card;