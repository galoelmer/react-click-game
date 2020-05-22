import React from 'react';
import { useTransition, a } from 'react-spring';
import useMeasure from '../../Hooks/useMeasure';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '../Card';
import './style.css';

const CardContainer = (props) => {
  const laptopSize = useMediaQuery('(max-width:1025px)');
  const tableSize = useMediaQuery('(max-width:770px)');
  const mobileSize = useMediaQuery('(max-width:600px)');

  const size = mobileSize ? 65 : tableSize ? 100 : laptopSize ? 110 : 150;

  const columns = 4;
  const [bind, { width }] = useMeasure();
  let heights = new Array(columns).fill(0);
  let padBottom = 0;

  let gridItems = props.list.map((child) => {
    const column = heights.indexOf(Math.min(...heights));
    const xy = [
      (width / columns) * column,
      (heights[column] += child.height / 2) - child.height / 2 + padBottom,
    ];
    // Add space to bottoms cards
    if (mobileSize) {
      padBottom -= column === 3 ? 30 : 0;
    } else {
      padBottom += column === 3 ? 20 : 0;
    }

    return { ...child, xy, width: size, height: size };
  });

  const transitions = useTransition(gridItems, (item) => item.image, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  return (
    <div {...bind} className="list" style={{ height: Math.max(...heights) }}>
      {transitions.map(({ item, props: { xy, ...rest }, key }) => (
        <a.div
          key={key}
          style={{
            transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
            ...rest,
          }}
        >
          <Card
            image={item.image}
            clickShuffle={() => props.action(item.isActive, item.key)}
          />
        </a.div>
      ))}
    </div>
  );
};

export default CardContainer;
