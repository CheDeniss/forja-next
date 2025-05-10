import React from 'react';
import styles from './GameDetailsFooter.module.scss';
import MatureImagesMap from './MatureImagesMap.js';
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import Image from 'next/image'

const GameDetailsFooter = ({ matureContent,
                             interfaceLanguages,
                             audioLanguages,
                             subtitlesLanguages }) => {
  return (
      <div className={styles.gameDetailsFooterContainer}>
          <div className={styles.matureContent}>
              <span className={styles.blockName}>MATURE CONTENT DESCRIPTION</span>


              <div className={styles.matureContentMain}>
                  <span className={styles.matureContentText}>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at
                  work: General Mature Content</span>
                  <div className={styles.icons}>
                      {matureContent.map((item) => (
                          <div key={item.id} className={styles.iconItem}>
                              <Image
                                  key={item.id}
                                  src={MatureImagesMap[item.name]}
                                  alt={item.name}
                                  width={85}
                                  height={111}
                              />
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          <div className={styles.languages}>
              <div className={styles.blockName}>Languages:</div>
              <table className={styles.languagesTable}>
                  <tbody>
                  <tr>
                      <td className={styles.cellName}>
                          <div className={styles.cellInner}>INTERFACE</div>
                      </td>
                      <td className={styles.cellValue}>
                          <div className={styles.cellInner}>{interfaceLanguages}</div>
                      </td>
                  </tr>
                  <tr className={styles.altRow}>
                      <td className={styles.cellName}>
                          <div className={styles.cellInner}>AUDIO</div>
                      </td>
                      <td className={styles.cellValue}>
                          <div className={styles.cellInner}>{audioLanguages}</div>
                      </td>
                  </tr>
                  <tr>
                      <td className={styles.cellName}>
                          <div className={styles.cellInner}>SUBTITLES</div>
                      </td>
                      <td className={styles.cellValue}>
                          <div className={styles.cellInner}>{subtitlesLanguages}</div>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
      </div>
  );
};

export default GameDetailsFooter;