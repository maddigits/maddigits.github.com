CHECK=✔
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

build:
	@echo "${HR}"
	@echo "Building Up CSS file..."
	@echo "${HR}"
	@recess --compress _assets/up.less > css/up.css
	@echo "Compiling and Compressing Less and CSS files with Recess... ${CHECK} Done"
	@echo "${HR}"
	@echo "Up successfully built."
	@echo "${HR}"
	@echo "<3 @caarlos0"

