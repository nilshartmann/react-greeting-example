#! /bin/bash

#docker logs -f GREETING_APP | awk '
#  /dist-.*|^GET/ {print "\033[32m" $0 "\033[39m"}
#  ! /dist-*/ {print $0 }
#'

docker logs -f GREETING_APP | awk '
  /^\"GET \/ / {print "\033[32m" $0 "\033[39m"; next}
  /^\"GET \/add / {print "\033[32m" $0 "\033[39m"; next}
  /dist-.*/ {print "\033[32m" $0 "\033[39m"; next}
  1
'