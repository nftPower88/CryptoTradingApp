import { useEffect, useState } from 'react';
import { useStore } from "../../lib/store";
import shallow from "zustand/shallow";
import { useQuery } from 'react-query';
import styles from "./index.module.css";

const Swap = () => {
  const { token } = useStore(
    (store) => ({
        token: store.token
    }),
    shallow
  );
  const [assetId, setAssetId] = useState(0);
  const [cryptoAmount, setCryptoAmount] = useState(0.0);
  const [fiatAmount, setFiatAmount] = useState(0.0);

  const { isLoading, data } = useQuery('repoData', () =>
    fetch('https://data.messari.io/api/v2/assets?with-profiles').then(res =>
        res.json()
    )
  )
  const assetUnit:any = data?.data[assetId];

  const financial = (x: any) => {
    return Number.parseFloat(x).toFixed(2);
  }

  const calculate = (price: number) => {
    const num_fiat: any = financial(price * assetUnit?.metrics.market_data.price_usd);
    setFiatAmount(num_fiat);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num: number = parseFloat(e.target.value);
    setCryptoAmount(num);
  }

  useEffect(()=>{
    calculate(cryptoAmount);
  }, [cryptoAmount, assetId])


  return (
    <div>
        <div className={styles.board}>
            <div className={styles.firstfield}>
                <input id="crypto" type="number" placeholder="Crypto Amount" className={styles.inputbox} onChange={(e)=>handleChange(e)} value={cryptoAmount}/>  
                <div className={styles.dropdown}>
                    <span id="swapasset" className={styles.controllabel}>{isLoading ? 'Loading...' : assetUnit?.symbol}</span>
                    {!isLoading && <div id="swaplist" className={styles.dropdowncontent}>
                    {
                    data?.data.map((d: any, index: number) => {
                        return(
                            <p key={index} className={styles.controlbutton} onClick={()=>setAssetId(index)}>{d.symbol}</p>
                        )
                    })
                    }                  
                    </div>}
                </div> 
            </div>
            {(token.length > 0) && <>
                <div className={styles.controlbar}><label>🔃</label></div>
                <div className={styles.secondfield}>                
                    <input id="fiat" type="number" placeholder="Fiat Amount" className={styles.inputbox} value={fiatAmount} readOnly/>  
                    <div className={styles.usdlabel}> USD </div>
                </div>
                <div className={styles.controlbar}>
                    <button className={styles.swapbutton}>Swap</button>
                </div>
            </>}          
        </div>
    </div>
  )
}

export default Swap
