import { useQuery } from 'react-query'
import styles from "./index.module.css";

const Assets = () => {
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
        <div className={styles.board}>            
            { 
            data?.data.map((d: any, index: number) => {
                const iconUri = 'https://messari.io/asset-images/' + d.id + '/32.png';
                if (index < 10) {
                    return(
                    <div className={styles.line} key={index}>
                        <div className={styles.icon}><img src={iconUri}></img></div>
                        <div className={styles.name}>{d.name}</div>
                        <div className={styles.price}>{financial(d.metrics.market_data.price_usd)}$</div>
                        <div className={styles.control}>Button</div>
                    </div>
                    );
                }
            })
            }
        </div>
    )
  }
  
  export default Assets
  