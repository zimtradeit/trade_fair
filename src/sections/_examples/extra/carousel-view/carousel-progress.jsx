import Box from '@mui/material/Box';

import {
  Carousel,
  useCarousel,
  CarouselProgressBar,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

export function CarouselProgress({ data }) {
  const carousel = useCarousel({ dragFree: true, slidesToShow: '70%', slideSpacing: '20px' });

  return (
    <>
      <Carousel carousel={carousel}>
        {data.map((item, index) => (
          <CarouselItem key={item.id} index={index} item={item} />
        ))}
      </Carousel>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
        <CarouselProgressBar {...carousel.progress} />
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

function CarouselItem({ item, index }) {
  return (
    <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <IndexLabel index={index + 1} />

      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{ objectFit: 'cover', aspectRatio: { xs: '4/3', sm: '16/10' } }}
      />
    </Box>
  );
}
