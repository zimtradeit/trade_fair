import Box from '@mui/material/Box';

import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

export function CarouselVariableWidths({ data }) {
  const carousel = useCarousel({ slidesToShow: 'auto', slideSpacing: '20px' });

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
        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

function CarouselItem({ item, index }) {
  const width = (index + 2) * 140;

  return (
    <Box sx={{ position: 'relative' }}>
      <IndexLabel index={index + 1} />

      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{
          borderRadius: 2,
          objectFit: 'cover',
          width: { xs: width / 3, md: width },
          height: { xs: 160, sm: 240, md: 320 },
        }}
      />
    </Box>
  );
}
