import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

import s from '../../styles/Rrss.module.css';

export default function SocialFollow(){
  return(
    <div  className={s.social}>
      <div className={s.tw}>
      <a href='https://www.instagram.com/fordiscover_hl/'
      className={s.instagram} target="_blank">
      <FontAwesomeIcon icon={faInstagram} size='3x'/>
      </a>
    </div>

    <div>
     <a href='https://twitter.com/ecommercehenry1'
      className={s.twitter} target="_blank">
      <FontAwesomeIcon icon={faTwitter} size='3x'/>
      </a>
      </div>
  
    </div>

  );
}