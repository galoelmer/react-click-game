import React from 'react';
import { useTransition, a } from 'react-spring';
import useMeasure from '../../Hooks/useMeasure';
import Card from '../Card';
import './style.css';

const CardContainer = (props) => {
  const columns = 4;
  const [bind, { width }] = useMeasure();
  let heights = new Array(columns).fill(0);

  let gridItems = props.list.map((child, i) => {
    const column = heights.indexOf(Math.min(...heights));
    const xy = [
      (width / columns) * column,
      (heights[column] += child.height / 2) - child.height / 2,
    ];
    return { ...child, xy, width: width / columns, height: child.height / 2 };
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
