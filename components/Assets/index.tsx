import { useState } from 'react';
import { useQuery } from 'react-query';
import styles from "./index.module.css";

const Assets = () => {
    const [ expand, setExpand ] = useState(false);

    const { isLoading, data } = useQuery('repoData', () =>
        fetch('https://data.messari.io/api/v2/assets?with-profiles').then(res =>
            res.json()
        )
    )

    const financial = (x: any) => {
        return Number.parseFloat(x).toFixed(2);
    }

    if (isLoading) return <div className={styles.board}><div className={styles.line}>Loading...</div></div>

    return (
        <div>
            <div id="assetboard" className={styles.board}>            
            { 
            data?.data.map((d: any, index: number) => {
                const iconUri = 'https://messari.io/asset-images/' + d.id + '/32.png';
                if (!expand && index >= 10) return;
                return(
                <div className={styles.line} key={index}>
                    <div className={styles.icon}><img src={iconUri}></img></div>
                    <div className={styles.name}>{d.name}</div>
                    <div className={styles.price}>{financial(d.metrics.market_data.price_usd)}$</div>
                    <div className={styles.control}>
                        <div className={styles.dropdown}>
                            <span id={'contlabel'+index} className={styles.controllabel}>Buy-Sel</span>
                            <div id={'buysel'+index} className={styles.dropdowncontent}>
                                <p className={styles.controlbutton} onClick={()=>console.log("Buy")}>Buy</p>
                                <p className={styles.controlbutton} onClick={()=>console.log("Sell")}>Sell</p>
                            </div>
                        </div>
                    </div>
                </div>
                );
            })
            }
            </div>
            <div className={styles.expandbar}>
                <button id="expand" onClick={()=>setExpand(!expand)} className={styles.expandbutton}>{expand?'↑':'↓'}</button>
            </div>
        </div>
    )
  }
  
  export default Assets
  